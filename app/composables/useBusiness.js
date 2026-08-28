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

  // Wrap mutateAsync for easier calling
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
    { ...options, skipAuthRedirect: true },
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

  const getWalletsQuery = (isFiat = null, queryOptions = {}) => {
    const hasFilter = isFiat !== null;
    const query = `
      query GetWallets${hasFilter ? "($filter: WalletFilter)" : ""} {
        business_wallets(wallet_type: TREASURY${hasFilter ? ", filter: $filter" : ""}) {
          id
          available_balance
          ledger_balance
          holding_balance
          currency
          active
          is_fiat
        }
      }
    `;
    
    const variables = hasFilter ? { filter: { is_fiat: isFiat } } : {};
    
    return useGQLQuery(
      ["wallets", isFiat],
      query,
      variables,
      queryOptions
    );
  };

  const GET_BUSINESS_WALLET_QUERY = `
    query GetBusinessWallet($currencyCode: String!) {
      business_wallet(currencyCode: $currencyCode, wallet_type: TREASURY) {
        id
        available_balance
        ledger_balance
        holding_balance
        currency
        active
        is_fiat
      }
    }
  `;
  const getBusinessWalletQuery = (currencyCode, queryOptions = {}) => {
    return useGQLQuery(
      ["wallet", currencyCode],
      GET_BUSINESS_WALLET_QUERY,
      { currencyCode },
      queryOptions
    );
  };

  const GET_FIAT_CURRENCIES_QUERY = `
    query GetFiatCurrencies {
      currencies(filter: {is_fiat: true}) {
        id
        code
        name
        symbol
        is_fiat
      }
    }
  `;

  const GET_CRYPTO_CURRENCIES_QUERY = `
    query GetCryptoCurrencies {
      currencies(filter: {is_fiat: false}) {
        id
        code
        name
        symbol
        is_fiat
      }
    }
  `;

  const getCurrenciesQuery = (isFiat = true, queryOptions = {}) => {
    const query = isFiat ? GET_FIAT_CURRENCIES_QUERY : GET_CRYPTO_CURRENCIES_QUERY;
    return useGQLQuery(
      ["currencies", isFiat],
      query,
      {},
      queryOptions
    );
  };

  const ADD_WALLET_MUTATION = `
    mutation AddWallet($currency_code: String!, $wallet_type: WalletType!) {
      add_business_wallet(currency_code: $currency_code, wallet_type: $wallet_type) {
        id
        available_balance
        ledger_balance
        holding_balance
        currency
        active
        is_fiat
      }
    }
  `;
  const addWalletMutation = useGQLMutation(ADD_WALLET_MUTATION);

  // ──────────────────────────────────────────────
  // Static NUBAN Accounts & Stablecoins
  // ──────────────────────────────────────────────
  const GET_BUSINESS_NUBAN_ACCOUNTS_QUERY = `
    query GetBusinessNubanAccounts {
      business_nuban_accounts {
        id
        account_number
        account_name
        bank_name
        currency
      }
    }
  `;

  const getNubanAccountsQuery = (queryOptions = {}) => {
    return useGQLQuery(
      ["businessNubanAccounts"],
      GET_BUSINESS_NUBAN_ACCOUNTS_QUERY,
      {},
      queryOptions
    );
  };

  const GENERATE_STATIC_NUBAN_ACCOUNT_MUTATION = `
    mutation GenerateStaticNubanAccount($wallet_type: WalletType!) {
      generateStaticNubanAccount(wallet_type: $wallet_type) {
        id
        account_number
        account_name
        bank_name
        currency
      }
    }
  `;

  const generateNubanAccountMutation = useGQLMutation(
    GENERATE_STATIC_NUBAN_ACCOUNT_MUTATION,
    {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["businessNubanAccounts"] });
        qc.invalidateQueries({ queryKey: ["wallets"] });
      },
    }
  );

  const genNubanOriginal = generateNubanAccountMutation.mutateAsync.bind(
    generateNubanAccountMutation
  );
  generateNubanAccountMutation.mutateAsync = async (walletType = "TREASURY") => {
    const typeVal = typeof walletType === "object"
      ? (walletType.wallet_type || walletType.walletType || "TREASURY")
      : walletType;
    return await genNubanOriginal({ wallet_type: typeVal });
  };

  const GET_BUSINESS_STABLECOINS_QUERY = `
    query GetBusinessStablecoins($filter: StablecoinFilter) {
      business_stablecoins(filter: $filter) {
        id
        address
        coin
        network
      }
    }
  `;

  const getStablecoinsQuery = (filter = null, queryOptions = {}) => {
    const variables = filter ? { filter } : {};
    return useGQLQuery(
      ["businessStablecoins", filter],
      GET_BUSINESS_STABLECOINS_QUERY,
      variables,
      queryOptions
    );
  };

  const GENERATE_STABLECOIN_MUTATION = `
    mutation GenerateStablecoin($input: StablecoinInput!) {
      generateStablecoin(input: $input) {
        id
        address
        coin
        network
      }
    }
  `;

  const generateStablecoinMutation = useGQLMutation(
    GENERATE_STABLECOIN_MUTATION,
    {
      onSuccess: () => {
        qc.invalidateQueries({ queryKey: ["businessStablecoins"] });
        qc.invalidateQueries({ queryKey: ["wallets"] });
      },
    }
  );

  const genStableOriginal = generateStablecoinMutation.mutateAsync.bind(
    generateStablecoinMutation
  );
  generateStablecoinMutation.mutateAsync = async (inputData) => {
    const input = inputData?.input ? inputData.input : inputData;
    return await genStableOriginal({ input });
  };

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
    getBusinessWalletQuery,
    addWallet: addWalletMutation,
    getNubanAccountsQuery,
    generateNubanAccount: generateNubanAccountMutation,
    getStablecoinsQuery,
    generateStablecoin: generateStablecoinMutation,
  };
};
