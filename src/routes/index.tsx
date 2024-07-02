import { lazy, Suspense, useState } from 'react';
import { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate, useRoutes } from 'react-router-dom';
import DashboardLayout from "../layouts/dashboard";
import axiosInstance from '../api/axios';
export const AppPage = lazy(() => import('../pages/app'));
export const HotelsPage = lazy(() => import('../pages/hotels'));
export const UsersPage = lazy(() => import('../pages/users'));
export const SigninPage = lazy(() => import('../pages/signin'));

export default function Router() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axiosInstance.get<{ isLogin: boolean }>('auth/admin/isLogin');
        const isLogin = res.data.isLogin;
        const isAuthRoute = [...pathname.matchAll(new RegExp("signin", "g"))].length;
        if (!isLogin && !isAuthRoute) {
          navigate('/signin');
        }
        if (isLogin && isAuthRoute) {
          navigate('/');
        }
      } catch (_) {
        navigate('/signin');
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <AppPage />, index: true },
        { path: 'hotels', element: <HotelsPage /> },
        { path: 'users', element: <UsersPage /> },
      ],
    }
    ,
    {
      path: "signin",
      element: <SigninPage />,
    },
    {
      path: "*",
      element: <>Trang không tồn tại, quay trở <Link to="/" >Trang chủ</Link> </>
    }

  ])
  if (loading) return null;
  return routes
}