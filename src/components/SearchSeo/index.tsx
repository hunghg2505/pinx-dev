import { useSearchParams } from 'next/navigation';

const SearchSeo = () => {
  const searchParams = useSearchParams();
  const search = searchParams.get('q');
  return (
    <>{search}</>
  );
};
export default SearchSeo;
