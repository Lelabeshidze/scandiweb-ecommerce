import { gql } from "@apollo/client";

export const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  query GetCurrenies {
    currencies {
      label
      symbol
    }
  }
`;
export const GET_PRODUCTS_BY_CATEGORIES = gql`
  query GetProductsByCategory($input: CategoryInput) {
    category(input: $input) {
      products {
        id
        name
        category
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
        inStock
      }
    }
  }
`;
export const GET_PRODUCT = gql`
  query GetProduct($productId: String!) {
    product(id: $productId) {
      id
      brand
      name
      inStock
      gallery
      description
      attributes {
        name
        type
        items {
          id
          displayValue
          value
        }
      }
      prices {
        currency {
          label
          symbol
        }
        amount
      }
    }
  }
`;

export const GET_TECH_PRODUCTS = gql`
  query {
    category(input: { title: "tech" }) {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
export const GET_CLOTHES_PRODUCTS = gql`
  query {
    category(input: { title: "clothes" }) {
      name
      products {
        name
        inStock
        gallery
        description
        category
        attributes {
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
      }
    }
  }
`;
