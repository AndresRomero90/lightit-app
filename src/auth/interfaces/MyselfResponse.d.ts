export interface MyselfResponse {
  me: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    date_of_birth: string;
    gender: 'male' | 'female';
  };
}
