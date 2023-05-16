import { supabase } from 'src/services';
import { ApiResultProps } from './result.comon.type';
import { Session, User } from '@supabase/supabase-js';

export interface AuthProps {
  email: string;
  password: string;
}
async function Register(data: AuthProps): Promise<ApiResultProps<null>> {
  try {
    const result = await supabase.auth.signUp(data);
    if (result.error === null) {
      return {
        success: true,
        data: null
      };
    }

    return {
      success: false,
      data: null
    };
  } catch (error) {
    return {
      success: false,
      data: null
    };
  }
}

type LoginResponseProps =
  | {
      user: User;
      session: Session;
    }
  | {
      user: null;
      session: null;
    };
async function Login(data: AuthProps): Promise<ApiResultProps<LoginResponseProps | null>> {
  try {
    const result = await supabase.auth.signInWithPassword(data);
    if (result.error === null) {
      return {
        success: true,
        data: result.data
      };
    }

    return {
      success: false,
      data: null
    };
  } catch (error) {
    return {
      success: false,
      data: null
    };
  }
}

export const UserApi = {
  Register,
  Login
};
