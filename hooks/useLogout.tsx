// hooks/useLogout.ts
import { authApi } from '@/app/store/api/authApi';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const useLogout = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.clear();
    dispatch(authApi.util.resetApiState());
    router.push("/");
  };

  return handleLogout;
};

export default useLogout;
