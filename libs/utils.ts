export const formatDate= (dataString: string) => {
    const date = new Date(dataString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
}

