import { useEffect, useState } from 'react';
import { AuthApi } from '../api/auth.api';
import { User } from '../interfaces/User';

export const useUserData = () => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    AuthApi.getInstance()
      .myself()
      .then((response) => {
        if (response.status === 200) {
          const me = response.data.me;
          setUser({
            id: me.id,
            firstName: me.first_name,
            lastName: me.last_name,
            email: me.email,
            dateOfBirth: new Date(me.date_of_birth),
            gender: me.gender,
          });
        }
      })
      .catch(console.error);
  }, []);

  return user;
};
