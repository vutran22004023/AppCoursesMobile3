import { useMutation} from '@tanstack/react-query';
export const useMutationHook = <TData = unknown, TVariables = unknown>(
  fnCallBack: (variables: TVariables) => Promise<TData>
) => {
  return useMutation({
    mutationFn: fnCallBack,
    onError: (error) => {
      console.error('Mutation error', error);
    },
  });
};