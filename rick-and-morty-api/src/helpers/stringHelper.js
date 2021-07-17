export const generateQueryString = (filterParameters,paging) => {
    let queryString = "?",
      subQueryStrings = [],
      parameters = paging
        ? filterParameters
        : filterParameters.filter((parameter) => parameter.key != "page");

    if (parameters.length > 0) {
      parameters.map((parameter) => {
        subQueryStrings.push(`${parameter.key}=${parameter.value}`);
      });

      return queryString + subQueryStrings.join("&");
    }
  };