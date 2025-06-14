export type SearchData = {
    query?: string;
    topicSlugs?: string[];
    orderBy?: OrderBySearch;
}

export type OrderBySearch = 'relevance' | 'recent' | 'oldest';