import dynamic from 'next/dynamic';

const Chunk1InitProfileSetting = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk1'));
const Chunk2InitProfile = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk2'));
const Chunk3InitMixPanel = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk3'));
const Chunk4InitStockHome = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk4'));
const Chunk5InitLocal = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk5'));
const Chunk6LoadScriptSlide = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk6'));
const Chunk7LoadScriptMixpanel = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk7'));
const Chunk8InitPostListHome = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk8'));
const Chunk9InitToast = dynamic(() => import('@layout/AppLayout/AppInitialData/Chunk9'));

const AppInitialData = () => {
  return (
    <>
      <Chunk1InitProfileSetting />
      <Chunk2InitProfile />
      <Chunk3InitMixPanel />
      <Chunk4InitStockHome />
      <Chunk5InitLocal />
      <Chunk6LoadScriptSlide />
      <Chunk7LoadScriptMixpanel />
      <Chunk8InitPostListHome />
      <Chunk9InitToast />
    </>
  );
};

export default AppInitialData;
