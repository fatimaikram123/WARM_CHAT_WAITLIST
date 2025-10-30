from flask import Flask, request, jsonify, session
import requests
import os
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy
import uuid
import os
from flask import send_from_directory
from werkzeug.utils import secure_filename
import redirect

app = Flask(__name__)
CORS(app, supports_credentials=True, resources={r"/*": {"origins": "http://localhost:8080"}})
bcrypt = Bcrypt(app)
# Configure Database (MySQL)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:1234@localhost/AmazonSeller"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False


db = SQLAlchemy(app)
UPLOAD_FOLDER = "uploads"
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER
app.config["MAX_CONTENT_LENGTH"] = 16 * 1024 * 1024  # 16MB max upload

# -------------------
# ENTITY DEFINITIONS
# -------------------

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    business = db.relationship("Business", backref="user", uselist=False)
    images = db.relationship("Images", backref="user", lazy=True)

class Business(db.Model):
    __tablename__ = "business"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), unique=True)
    street_Address = db.Column(db.String(255))
    city = db.Column(db.String(255))
    postalCode = db.Column(db.String(50))
    phone_no = db.Column(db.String(50))
    vat_no = db.Column(db.String(50))
    state = db.Column(db.String(50))
    country = db.Column(db.String(50))
class Images(db.Model):
    __tablename__ = "images"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    name = db.Column(db.String(255))
    absolute_path = db.Column(db.String(500))
    relative_path = db.Column(db.String(500))
    mime_type = db.Column(db.String(100))
    size = db.Column(db.BigInteger)
    uploaded_at = db.Column(db.DateTime, server_default=db.func.now())
    is_active = db.Column(db.Boolean, default=True)
    description = db.Column(db.Text)
    isBackGround = db.Column(db.Boolean, default=False)


class LayoutSize(db.Model):
    __tablename__ = "layout_size"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255))
    size = db.Column(db.String(255))
    size_description = db.Column(db.String(500))
    isGrid = db.Column(db.Boolean, default=False)
    icon = db.Column(db.String(255))
    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "dimensions": self.size,
            "description": self.size_description,
            "isGrid": self.isGrid,
            "icon": self.icon
        }


class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(500))
    description = db.Column(db.String(5000))
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    layout_id = db.Column(db.Integer, db.ForeignKey("layout_size.id"))
    background_image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    grid_layout_id = db.Column(db.Integer, db.ForeignKey("layout_size.id"))
    font_family = db.Column(db.String(50))
    custom_text = db.Column(db.String(5000))
    isPublished = db.Column(db.Boolean, default=False)
    user = db.relationship("User", foreign_keys=[user_id], backref="projects_with_user")
    layout = db.relationship("LayoutSize", foreign_keys=[layout_id], backref="projects_with_layout")
    grid_layout = db.relationship("LayoutSize", foreign_keys=[grid_layout_id], backref="projects_with_grid")
    background_image = db.relationship("Images", foreign_keys=[background_image_id], backref="projects")
    orders = db.Column(db.String(255))
    asin = db.Column(db.String(255))
    status = db.Column(db.String(255))
    createdAt=db.Column(db.Date)
    updatedAt=db.Column(db.Date)
    includeCoverPage = db.Column(db.Boolean, default=False)
    pageSizeColumns = db.Column(db.Integer)
    pageSizeRows = db.Column(db.Integer)
    thumbnail_image_id = db.Column(db.Integer, db.ForeignKey("images.id"))
    thumbnail_image = db.relationship("Images", foreign_keys=[thumbnail_image_id], backref="project_with_Images")


REDIRECT_URI = "http://localhost:3000/auth/callback"  # same as in Amazon developer console




# SIGNUP
@app.route("/signup", methods=["POST"])
def signup():
    data = request.json
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "User already exists"}), 400

    hashed_pw = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(username=username, email=email, password=hashed_pw)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "Signup successful"}), 201


# LOGIN
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        session["user"] = user.id
        session_id = str(uuid.uuid4())
        return jsonify({
            "message": "Login successful",
            "user": {"id": user.id, "username": user.username, "email": user.email},
            "sessionId": session_id
        })

    return jsonify({"error": "Invalid email or password"}), 401


# LOGOUT
@app.route("/logout", methods=["POST"])
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out"})


# GET PROFILE
@app.route("/profile", methods=["GET"])
def profile():
    sessionId = request.args.get("sessionId")
    user_id = request.args.get("userId")

    if not sessionId:
        return jsonify({"error": "Unauthorized"}), 401

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    parts = user.username.strip().split(" ", 1)
    first_name = parts[0]
    last_name = parts[1] if len(parts) > 1 else ""

    business = user.business

    response = {
        "id": user.id,
        "first_name": first_name,
        "last_name": last_name,
        "email": user.email,
        "username": user.username,
        "business": {
            "id": business.id,
            "street_Address": business.street_Address,
            "city": business.city,
            "postalCode": business.postalCode,
            "phone_no": business.phone_no,
            "vat_no": business.vat_no,
            "state": business.state,
            "country": business.country,
        } if business else None
    }

    return jsonify({"user": response})

@app.route("/layoutSize", methods=["GET"])
def getLayoutSize():
    sessionId = request.args.get("sessionId")
    if not sessionId:
        return jsonify({"error": "Unauthorized"}), 401
    layouts = LayoutSize.query.filter_by(isGrid=False).all()

    return jsonify([layout.to_dict() for layout in layouts])
@app.route("/Grid", methods=["GET"])
def getGrids():
    sessionId = request.args.get("sessionId")
    if not sessionId:
        return jsonify({"error": "Unauthorized"}), 401
    grid = LayoutSize.query.filter_by(isGrid=True).all()
    return jsonify([g.to_dict() for g in grid])
# CREATE OR UPDATE BUSINESS
@app.route("/profile/business", methods=["POST"])
def update_business():
    data = request.json
    sessionId = data.get("sessionId")
    user_id = data.get("userId")

    if not sessionId:
        return jsonify({"error": "Unauthorized"}), 401

    business = Business.query.filter_by(user_id=user_id).first()
    if not business:
        business = Business(user_id=user_id)

    business.street_Address = data.get("streetAddress")
    business.city = data.get("city")
    business.postalCode = data.get("postalCode")
    business.phone_no = data.get("phoneNumber")
    business.vat_no = data.get("vatNumber")
    business.state = data.get("state")
    business.country = data.get("country")

    db.session.add(business)
    db.session.commit()

    return jsonify({"message": "Business information updated successfully"})

@app.route("/project/<int:project_id>", methods=["GET"])
def get_project(project_id):
    project = Project.query.get(project_id)
    if not project:
        return jsonify({"error": "Project not found"}), 404

    image_data = None
    if project.background_image_id:
        image = Images.query.get(project.background_image_id)
        if image:
            image_data = {
                "id": image.id,
                "name": image.name,
                "mime_type": image.mime_type,
                "size": image.size,
                "description": image.description,
                "is_active": image.is_active,
                # Add API URL to fetch the actual file
                "absolute_path": image.absolute_path,
                "relative_path": image.relative_path,
                "user_id": image.user_id,
            }

    _thumbnail_image_data = None
    thumbnail_data= None
    if project.thumbnail_image_id:
        image = Images.query.get(project.thumbnail_image_id)
        if image:
            thumbnail_data = {
                "id": image.id,
                "name": image.name,
                "mime_type": image.mime_type,
                "size": image.size,
                "description": image.description,
                "is_active": image.is_active,
                # Add API URL to fetch the actual file
                "absolute_path": image.absolute_path,
                "relative_path": image.relative_path,
                "user_id": image.user_id,
            }

    return (jsonify({
        "id": project.id,
        "name": project.name,
        "description": project.description,
        "layoutSize": project.layout_id,
        "gridCount": project.grid_layout_id,
        "font_family": project.font_family,
        "custom_text": project.custom_text,
        "isPublished": project.isPublished,
        "user_id": project.user_id,
        "background_image": image_data,
        "orders" : project.orders,
        "asin" :  project.asin,
        "status" : project.status,
        "createdAt":project.createdAt,
        "updatedAt":project.updatedAt,
        "includeCoverPage" : project.includeCoverPage,
        "pageSize": {
            "columns": project.pageSizeColumns if project.pageSizeColumns is not None else 0,
            "rows": project.pageSizeRows if project.pageSizeRows is not None else 0
        },
        "thumbnail_image_id" : project.thumbnail_image_id,
        "thumbnail" : thumbnail_data,
        "items": []
}))
@app.route("/projects/getAll/<int:user_id>", methods=["GET"])
def get_all_projects(user_id):
    projects = Project.query.filter_by(user_id=user_id).all()
    response = []
    for project in projects:
        if not project:
            return jsonify({"error": "Project not found"}), 404

        image_data = None
        if project.background_image_id:
            image = Images.query.get(project.background_image_id)
            if image:
                image_data = {
                    "id": image.id,
                    "name": image.name,
                    "mime_type": image.mime_type,
                    "size": image.size,
                    "description": image.description,
                    "is_active": image.is_active,
                    # Add API URL to fetch the actual file
                    "absolute_path": image.absolute_path,
                    "relative_path": image.relative_path,
                    "user_id": image.user_id,
                }

        _thumbnail_image_data = None
        thumbnail_data = None
        if project.thumbnail_image_id:
            image = Images.query.get(project.thumbnail_image_id)
            if image:
                thumbnail_data = {
                    "id": image.id,
                    "name": image.name,
                    "mime_type": image.mime_type,
                    "size": image.size,
                    "description": image.description,
                    "is_active": image.is_active,
                    # Add API URL to fetch the actual file
                    "absolute_path": image.absolute_path,
                    "relative_path": image.relative_path,
                    "user_id": image.user_id,
                }

        response.append({
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "layoutSize": project.layout_id,
            "gridCount": project.grid_layout_id,
            "font_family": project.font_family,
            "custom_text": project.custom_text,
            "isPublished": project.isPublished,
            "user_id": project.user_id,
            "background_image": image_data,
            "orders": project.orders,
            "asin": project.asin,
            "status": project.status,
            "createdAt": project.createdAt,
            "updatedAt": project.updatedAt,
            "includeCoverPage": project.includeCoverPage,
            "pageSize": {
                "columns": project.pageSizeColumns if project.pageSizeColumns is not None else 0,
                "rows": project.pageSizeRows if project.pageSizeRows is not None else 0
            },
            "thumbnail_image_id": project.thumbnail_image_id,
            "thumbnail": thumbnail_data,
            "items": []
        })
    return jsonify(response), 200
    #     response.append({
    #       "id":img.id,
    #       "user_id" : img.user_id,
    #       "absolute_path" : img.absolute_path,
    #       "relative_path" : img.relative_path,
    #       "mime_type" : img.mime_type,
    #       "size" : img.size,
    #       "is_active" : img.is_active,
    #       "description" :img.description,
    #       "isBackground" : img.isBackGround,
    #       "name":img.name
    #     })
    #
    # return jsonify(response), 200

@app.route("/images/getAll/<int:user_id>", methods=["GET"])
def get_all_image(user_id):
    images = Images.query.filter_by(user_id=user_id,isBackGround=True).all()
    response = []
    for img in images:

        response.append({
          "id":img.id,
          "user_id" : img.user_id,
          "absolute_path" : img.absolute_path,
          "relative_path" : img.relative_path,
          "mime_type" : img.mime_type,
          "size" : img.size,
          "is_active" : img.is_active,
          "description" :img.description,
          "isBackground" : img.isBackGround,
          "name":img.name
        })

    return jsonify(response), 200


@app.route("/uploads/<path:filename>")
def serve_uploaded_file(filename):
    return send_from_directory(app.config["UPLOAD_FOLDER"], filename)


# New API: Serve the actual image by ID
@app.route("/images/<int:image_id>", methods=["GET"])
def get_image(image_id):
    image = Images.query.get(image_id)
    if not image:
        return jsonify({"error": "Image not found"}), 404

    # Prefer absolute path if exists, else relative
    path = image.absolute_path if os.path.isabs(image.absolute_path) else os.path.join(app.root_path, image.relative_path)

    if not os.path.exists(path):
        return jsonify({"error": "File missing on server"}), 404

@app.route("/project", methods=["POST"])
def create_or_update_project():
    project_id = request.form.get("project_id")
    userId = request.form.get("user_id")

    # Handle image upload if provided
    image_file = request.files.get("background")
    background_image_id = request.form.get("background_image_id")

    if image_file:
        filename = secure_filename(image_file.filename)
        if background_image_id:
            # Try to fetch existing image
            new_image = Images.query.get(background_image_id)
            if new_image:
                # Update existing image
                new_image.user_id = userId
                new_image.mime_type = image_file.mimetype
                new_image.is_active = True
                new_image.description = f"Updated image {filename}"
                new_image.isBackGround = True
            else:
                # If not found, create new
                new_image = Images(
                    user_id=userId,
                    mime_type=image_file.mimetype,
                    is_active=True,
                    description=f"Uploaded image {filename}",
                    isBackGround=True
                )
                db.session.add(new_image)
        else:
            # Create new if no ID provided
            new_image = Images(
                user_id=userId,
                mime_type=image_file.mimetype,
                is_active=True,
                description=f"Uploaded image {filename}",
                isBackGround = True
            )
            db.session.add(new_image)

        db.session.commit()

        background_image_id = new_image.id
        name, ext = os.path.splitext(filename)
        save_path = os.path.join(app.config["UPLOAD_FOLDER"], f"{name}_{background_image_id}{ext}")
        image_file.save(save_path)
        if background_image_id:
            # Try to fetch existing image
            new_image = Images.query.get(background_image_id)
            if new_image:
                new_image.name = f"{name}_{background_image_id}{ext}"
                # Update existing image
                new_image.user_id = userId
                new_image.absolute_path = os.path.abspath(save_path)
                new_image.relative_path = save_path
                new_image.mime_type = image_file.mimetype
                new_image.size = os.path.getsize(save_path)
                new_image.is_active = True
                new_image.description = f"Updated image {filename}"
                new_image.isBackGround = True
        db.session.add(new_image)
        db.session.commit()

    if project_id:  # ---------------- UPDATE ----------------
        project = Project.query.get(project_id)
        if not project:
            return jsonify({"error": "Project not found"}), 404

        # update only if value provided
        if request.form.get("name"):
            project.name = request.form.get("name")
        if request.form.get("description"):
            project.description = request.form.get("description")
        if request.form.get("layoutSize"):
            project.layout_id = request.form.get("layoutSize")
        if request.form.get("gridCount"):
            project.grid_layout_id = request.form.get("gridCount")
        if request.form.get("fontFamily"):
            project.font_family = request.form.get("fontFamily")
        if request.form.get("text"):
            project.custom_text = request.form.get("text")
        if request.form.get("isPublished"):
            project.isPublished = request.form.get("isPublished", str(project.isPublished)).lower() == "true"
        if request.form.get("user_id"):
            project.user_id = request.form.get("user_id")
        if background_image_id:  # replace image only if uploaded
            project.background_image_id = background_image_id
        project.isBackGround = True

        db.session.commit()

        return jsonify({
            "project_id": project.id,
            "name": project.name,
            "description": project.description,
            "layoutSize": project.layout_id,
            "gridCount": project.grid_layout_id,
            "fontFamily": project.font_family,
            "text": project.custom_text,
            "isPublished": project.isPublished,
            "user_id": project.user_id,
            "background": project.background_image_id,
            "background_image_id": project.background_image_id,
            "isBackground": project.isBackGround
        })

    else:  # ---------------- CREATE ----------------
        project = Project(
            name=request.form.get("name"),
            description=request.form.get("description"),
            layout_id=request.form.get("layoutSize"),
            grid_layout_id=request.form.get("gridCount"),
            font_family=request.form.get("fontFamily"),
            custom_text=request.form.get("text"),
            isPublished=request.form.get("isPublished", "false").lower() == "true",
            background_image_id=background_image_id,
            user_id = request.form.get("user_id")
        )

        db.session.add(project)
        db.session.commit()
        return jsonify({
            "project_id": project.id,
            "name": project.name,
            "description": project.description,
            "layoutSize": project.layout_id,
            "gridCount": project.grid_layout_id,
            "fontFamily": project.font_family,
            "text": project.custom_text,
            "isPublished": project.isPublished,
            "user_id": project.user_id,
            "background": project.background_image_id,
            "background_image_id": project.background_image_id
        })



if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True, use_reloader=False)
