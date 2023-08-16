import Link from 'next/link';

import { ROUTE_PATH } from '@utils/common';

const IconAvartaEdit = () => {
  return (
    <Link
      href={ROUTE_PATH.EDIT_MY_PROFILE}
      className='absolute right-[9px] top-[4px] z-10 flex h-[28px] w-[28px] items-center justify-center rounded-full border-[1px] border-solid border-primary_blue bg-white p-[7.85px] galaxy-max:h-[22px] galaxy-max:w-[22px] galaxy-max:p-[5px] tablet:hidden'
    >
      <svg
        width='17'
        height='17'
        viewBox='0 0 17 17'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M13.1081 2.59786L14.3983 3.88621C14.9983 4.48544 14.9983 5.44421 14.4283 6.04344L6.26703 14.193C6.23703 14.2229 6.20702 14.2529 6.17702 14.2529H6.14702H6.11701L2.51647 14.8521H2.45646C2.36645 14.8521 2.30644 14.8222 2.24643 14.7623C2.18642 14.6724 2.12641 14.5825 2.15642 14.4926L2.75651 10.8972V10.8673V10.8373C2.77151 10.8223 2.77901 10.8073 2.78651 10.7923C2.79401 10.7774 2.80151 10.7624 2.81652 10.7474L11.0077 2.59786C11.2778 2.29825 11.6678 2.14844 12.0579 2.14844C12.448 2.14844 12.838 2.32821 13.1081 2.59786ZM2.99654 12.8747L4.07671 13.9533L5.3969 13.7436L3.20658 11.5564L2.99654 12.8747ZM10.4977 6.91233L5.60693 11.7961C5.54693 11.856 5.45691 11.8859 5.3969 11.8859C5.30689 11.8859 5.24688 11.856 5.18687 11.7961C5.06685 11.6762 5.06685 11.4964 5.18687 11.3766L10.0776 6.49286C10.1976 6.37302 10.3776 6.37302 10.4977 6.49286C10.6177 6.61271 10.6177 6.79248 10.4977 6.91233ZM10.0476 4.36559L12.628 6.94229L13.4081 6.16329L10.8277 3.58659L10.0476 4.36559Z'
          fill='#1F6EAC'
        />
      </svg>
    </Link>
  );
};
export default IconAvartaEdit;
