export interface LoginSchema {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserProfileSchema {
  country_code: string;
  first_name: string;
  last_name: string;
  nmls: string;
  phone_number: string;
}

export interface UserRolesSchema {
  id: string;
  name: string;
}

export interface AuthMeResponseTypes {
  email: string;
  id: string;
  roles: UserRolesSchema;
  user_profile: UserProfileSchema;
}

export interface ValidateUserResponseTypes {
  user_profile: {
    last_name: string;
    first_name: string;
  };
  email: string;
  id: string;
  invitation_expires_at: Date;
  status: string;
}
