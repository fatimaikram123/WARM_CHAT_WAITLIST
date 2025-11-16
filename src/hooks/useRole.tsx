// src/hooks/useRole.js
export const useRole = () => {
  const roleId = parseInt(localStorage.getItem("role_id"));
  const roleName = localStorage.getItem("role_name");

  const isAdmin = roleId === 2;
  const isManager = roleId === 4;
  const isAgent = roleId === 3;
  const isGuest = roleId === 1

  return { roleId, roleName, isAdmin, isManager, isAgent, isGuest };
};
