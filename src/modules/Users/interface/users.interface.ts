export interface UserRoles {
  id: string;
  name: string;
}

export interface OrganizationUserBody {
  first_name: string;
  last_name: string;
  email: string;
  user_role_id: string;
}
