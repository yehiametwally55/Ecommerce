import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(products: any[], searchTerm: string): any[] {
    // 1. Handle undefined or null products input
    if (!products) {
      return []; // Or return null, depending on how you want to handle it
    }

    // 2. Handle empty or undefined searchTerm
    if (!searchTerm || searchTerm.trim() === '') {
      return products; // Return all products if no search term
    }

    // 3. Ensure products is actually an array (though TypeScript type helps)
    if (!Array.isArray(products)) {
        console.warn('SearchPipe received non-array input:', products);
        return [];
    }

    const lowerSearchTerm = searchTerm.toLowerCase();

    return products.filter((product) => {
      // 4. Ensure product and product.title exist and title is a string
      return product && typeof product.name === 'string' &&
             product.name.toLowerCase().includes(lowerSearchTerm);
    });
  }
}

