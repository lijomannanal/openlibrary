import { renderHook, act } from '@testing-library/react-hooks';
import useLoader from '../hooks/useLoader';

describe('useLoader Component', () => {
  test('should have deafult value of isLoading as false', () => {
    const { result } = renderHook(() => useLoader());
    expect(result.current.isLoading).toBe(false);
  });

  test('should set isLoading to true on showLoader call', () => {
    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.showLoader();
    });
    expect(result.current.isLoading).toBe(true);
  });

  test('should set isLoading to true on hideLoader call', () => {
    const { result } = renderHook(() => useLoader());

    act(() => {
      result.current.showLoader();
    });
    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.hideLoader();
    });
    expect(result.current.isLoading).toBe(false);
  });
});
