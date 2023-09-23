type AllNewsDataType = {
  response: {
    status: string;
    userTier: string;
    total: number;
    startIndex: number;
    pageSize: number;
    currentPage: number;
    pages: number;
    orderBy: string;
    results: OneNewsDataType[];
  };
};

type OneNewsDataType = {
  id: string;
  type: string;
  sectionId: string;
  sectionName: string;
  webPublicationDate: string;
  webTitle: string;
  webUrl: string;
  apiUrl: string;
  fields: {
    thumbnail: string;
  };
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

export type { AllNewsDataType, OneNewsDataType };
