import { supabase } from 'src/services';
import { ApiResultProps } from './result.comon.type';

export interface CreateBookPayloadProps {
  title: string;
  author: string;
  description: string;
  category: string;
  img: string;
}
async function CreateANewBook(data: CreateBookPayloadProps): Promise<ApiResultProps<null>> {
  try {
    const result = await supabase.from('books').insert([{ ...data }]);
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

async function GetAllBooks(): Promise<ApiResultProps<any>> {
  try {
    const { data: books, error } = await supabase.from('books').select('*');

    if (error === null) {
      return {
        success: true,
        data: books
      };
    }

    return {
      success: false,
      data: []
    };
  } catch (error) {
    return {
      success: false,
      data: []
    };
  }
}

export const BooksApi = {
  CreateANewBook,
  GetAllBooks
};
