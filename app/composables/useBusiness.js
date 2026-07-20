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
    return useGQLQuery(
      ["businessDetail", id],
      GET_BUSINESS_DETAIL_QUERY,
      computed(() => ({ id: unref(id) })),
      { enabled: computed(() => !!unref(id)), ...queryOptions }
    );
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
  };
};
