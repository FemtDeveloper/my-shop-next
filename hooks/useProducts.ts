import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';


<<<<<<< HEAD
export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  const { data, error } = useSWR<IProduct[]>(`/api${url}`, config);
=======
// const fetcher = (...args: [key: string]) => fetch(...args).then(res => res.json());
>>>>>>> d5f8170ac79c796906194b00ae0316393af08687

export const useProducts = (url: string, config: SWRConfiguration = {} ) => {

    // const { data, error } = useSWR<IProduct[]>(`/api${ url }`, fetcher, config );
    const { data, error } = useSWR<IProduct[]>(`/api${ url }`, config );

    return {
        products: data || [],
        isLoading: !error && !data,
        isError: error
    }

}
