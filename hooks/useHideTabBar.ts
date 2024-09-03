import { useSegments } from 'expo-router';

const useHideTabBar = () => {
  const segments = useSegments();
  const hideTabBar =
    segments.includes('(login)') ||
    segments.includes('(register)') ||
    segments.includes('(Setting)');
  return hideTabBar;
};

export default useHideTabBar;
