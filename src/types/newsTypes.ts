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
    headline: string;
    main: string;
    body: string;
    wordcount: string;
    thumbnail: string;
    firstPublicationDate: string;
    lastModified: string;
    shortUrl: string;
  };
  isHosted: boolean;
  pillarId: string;
  pillarName: string;
};

export type { AllNewsDataType, OneNewsDataType };
