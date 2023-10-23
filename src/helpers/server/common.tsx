function sort<T, K extends keyof T>(dataset: T[], sortBy: K, sortOrder: string | null): T[] {
    return dataset.sort(
        (a, b) => {
            if (a[sortBy] < b[sortBy])
            {   
                if (sortOrder === "asc") 
                {
                    return -1;
                } else if (sortOrder === "desc")
                {
                    return 1;
                }
            
            } else if (a[sortBy] > b[sortBy]) {
                if (sortOrder === "asc") 
                {
                    return 1;
                } else if (sortOrder === "desc")
                {
                    return -1;
                }
            }

            return 0;
        }
    )
}

function extractParamsFromUrl(request: Request) {
    const { url } = request;
    const urlObject = new URL(url);
  
    const params = urlObject.searchParams;
  
    return params;
  }

export {
     sort,
     extractParamsFromUrl
};