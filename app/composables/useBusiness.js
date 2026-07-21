import { useGQLQuery, useGQLMutation } from "./useGraphQL";
import { useQueryClient } from "@tanstack/vue-query";
import { unref, computed } from "vue";

export const useBusiness = (options = {}) => {
  const qc = useQueryClient();

  // ──────────────────────────────────────────────
  // Fetch User Businesses
  // ──────────────────────────────────────────────
  const USER_BUSINESSES_QUERY = `
    query GetUserBusinesses {
      myBusinesses {
        id
        name
        role
        logo
      }
    }
  `;

  const userBusinessesQuery = useGQLQuery(
    ["userBusinesses"],
    USER_BUSINESSES_QUERY,
    {},
    options,
  );

  // ──────────────────────────────────────────────
  // Register New Business
  // ──────────────────────────────────────────────
  const REGISTER_BUSINESS_MUTATION = `
    mutation RegisterBusiness($input: RegisterBusinessInput!) {
      registerBusiness(input: $input)
    }
  `;

  const registerBusinessMutation = useGQLMutation(REGISTER_BUSINESS_MUTATION, {
    onSuccess: () => {
      // Invalidate the userBusinesses query so the list refreshes automatically
      qc.invalidateQueries({ queryKey: ["userBusinesses"] });
    },
    onError: (err) => {
      console.error("RegisterBusiness error:", err);
    },
  });

  const registerOriginal = registerBusinessMutation.mutateAsync.bind(
    registerBusinessMutation,
  );
  registerBusinessMutation.mutateAsync = async (inputData) => {
    return await registerOriginal({ input: inputData });
  };

  // ──────────────────────────────────────────────
  // Business Detail / Update
  // ──────────────────────────────────────────────
  const BUSINESS_DETAIL_MUTATION = `
    mutation BusinessDetail($input: businessDetail!) {
      businessDetail(input: $input)
    }
  `;

  const businessDetailMutation = useGQLMutation(BUSINESS_DETAIL_MUTATION, {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userBusinesses"] });
      qc.invalidateQueries({ queryKey: ["activeBusiness"] });
    },
  });

  const businessDetailOriginal = businessDetailMutation.mutateAsync.bind(
    businessDetailMutation,
  );
  businessDetailMutation.mutateAsync = async (inputData) => {
    return await businessDetailOriginal({ input: inputData });
  };

  // ──────────────────────────────────────────────
  // Document Management
  // ──────────────────────────────────────────────
  const UPLOAD_DOCUMENT_MUTATION = `
    mutation UploadDocument($input: DocumentInput!) {
      uploadDocument(input: $input)
    }
  `;
  const uploadDocumentMutation = useGQLMutation(UPLOAD_DOCUMENT_MUTATION, {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["businessDocuments"] });
    },
  });

  const uploadDocOriginal = uploadDocumentMutation.mutateAsync.bind(
    uploadDocumentMutation,
  );
  uploadDocumentMutation.mutateAsync = async (inputData) => {
    return await uploadDocOriginal({ input: inputData });
  };

  const DELETE_DOCUMENT_MUTATION = `
    mutation DeleteDocument($input: RemoveDocumentInput!) {
      deleteDocument(input: $input)
    }
  `;
  const deleteDocumentMutation = useGQLMutation(DELETE_DOCUMENT_MUTATION, {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["businessDocuments"] });
    },
  });

  const deleteDocOriginal = deleteDocumentMutation.mutateAsync.bind(
    deleteDocumentMutation,
  );
  deleteDocumentMutation.mutateAsync = async (inputData) => {
    return await deleteDocOriginal({ input: inputData });
  };

  // ──────────────────────────────────────────────
  // Queries
  // ──────────────────────────────────────────────
  const GET_KYB_DOCUMENTS_QUERY = `
    query GetKYBDocuments {
      getKYBDocuments {
        id
        name
        required
      }
    }
  `;
  const kybDocumentsQuery = useGQLQuery(
    ["kybDocuments"],
    GET_KYB_DOCUMENTS_QUERY,
    {},
    options,
  );

  const GET_BUSINESS_DOCUMENTS_QUERY = `
    query GetBusinessDocuments {
      getDocuments {
        id
        description
        url
        document_id
      }
    }
  `;
  const businessDocumentsQuery = useGQLQuery(
    ["businessDocuments"],
    GET_BUSINESS_DOCUMENTS_QUERY,
    {},
    options,
  );

  const getBusinessDetailQuery = (id, queryOptions = {}) => {
    const GET_BUSINESS_DETAIL_QUERY = `
      query GetBusinessDetail($id: String!) {
        business(id: $id) {
          id
          name
          logo
          email
          on_site
          about
          industry
          number
          country_of_incorporation
          date_of_incorporation
          tax_identification_number
          address {
            number
            city
            street
            state
            country
            zip_code
          }
        }
      }
    `;
    // Use a computed queryKey so TanStack Query automatically refetches when the id changes
    return useGQLQuery(
      computed(() => ["businessDetail", unref(id)]),
      GET_BUSINESS_DETAIL_QUERY,
      computed(() => ({ id: unref(id) })),
      {
        // Only run the query when we actually have a non-null id
        enabled: computed(() => !!unref(id)),
        ...queryOptions,
      },
    );
  };

  const GET_WALLETS_QUERY = `
    query GetWallets($wallet_type: WalletType! = TREASURY) {
      wallets(wallet_type: $wallet_type) {
        id
        type
        available_balance
        ledger_balance
        holding_balance
        currency
        active
      }
    }
  `;
  const getWalletsQuery = (walletType = "TREASURY", queryOptions = {}) => {
    return useGQLQuery(
      ["wallets", walletType],
      GET_WALLETS_QUERY,
      { wallet_type: walletType },
      queryOptions,
    );
  };

  const GET_CURRENCIES_QUERY = `
    query GetCurrencies {
      currencies {
        id
        code
        name
        symbol
        is_fiat
      }
    }
  `;
  const getCurrenciesQuery = (queryOptions = {}) => {
    return useGQLQuery(["currencies"], GET_CURRENCIES_QUERY, {}, queryOptions);
  };

  const ADD_WALLET_MUTATION = `
    mutation AddWallet($currency_code: String!, $wallet_type: WalletType!) {
      add_wallet(currency_code: $currency_code, wallet_type: $wallet_type) {
        id
        type
        available_balance
        ledger_balance
        holding_balance
        currency
        active
      }
    }
  `;
  const addWalletMutation = useGQLMutation(ADD_WALLET_MUTATION);

  return {
    userBusinesses: userBusinessesQuery,
    registerBusiness: registerBusinessMutation,
    businessDetail: businessDetailMutation,
    uploadDocument: uploadDocumentMutation,
    deleteDocument: deleteDocumentMutation,
    kybDocuments: kybDocumentsQuery,
    businessDocuments: businessDocumentsQuery,
    getBusinessDetailQuery,
    getWalletsQuery,
    getCurrenciesQuery,
    addWallet: addWalletMutation,
  };
};
