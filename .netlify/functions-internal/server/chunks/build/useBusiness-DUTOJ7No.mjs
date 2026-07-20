import { a as useGQLQuery, u as useGQLMutation } from './useGraphQL-Bw_Hbd5v.mjs';
import { useQueryClient } from '@tanstack/vue-query';

const useBusiness = (options = {}) => {
  const qc = useQueryClient();
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
    options
  );
  const REGISTER_BUSINESS_MUTATION = `
    mutation RegisterBusiness($input: RegisterBusinessInput!) {
      registerBusiness(input: $input)
    }
  `;
  const registerBusinessMutation = useGQLMutation(REGISTER_BUSINESS_MUTATION, {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userBusinesses"] });
    },
    onError: (err) => {
      console.error("RegisterBusiness error:", err);
    }
  });
  const registerOriginal = registerBusinessMutation.mutateAsync.bind(
    registerBusinessMutation
  );
  registerBusinessMutation.mutateAsync = async (inputData) => {
    return await registerOriginal({ input: inputData });
  };
  const BUSINESS_DETAIL_MUTATION = `
    mutation BusinessDetail($input: businessDetail!) {
      businessDetail(input: $input)
    }
  `;
  const businessDetailMutation = useGQLMutation(BUSINESS_DETAIL_MUTATION, {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["userBusinesses"] });
    }
  });
  const businessDetailOriginal = businessDetailMutation.mutateAsync.bind(
    businessDetailMutation
  );
  businessDetailMutation.mutateAsync = async (inputData) => {
    return await businessDetailOriginal({ input: inputData });
  };
  const UPLOAD_DOCUMENT_MUTATION = `
    mutation UploadDocument($input: DocumentInput!) {
      uploadDocument(input: $input)
    }
  `;
  const uploadDocumentMutation = useGQLMutation(UPLOAD_DOCUMENT_MUTATION, {
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["businessDocuments"] });
    }
  });
  const uploadDocOriginal = uploadDocumentMutation.mutateAsync.bind(
    uploadDocumentMutation
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
    }
  });
  const deleteDocOriginal = deleteDocumentMutation.mutateAsync.bind(
    deleteDocumentMutation
  );
  deleteDocumentMutation.mutateAsync = async (inputData) => {
    return await deleteDocOriginal({ input: inputData });
  };
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
    options
  );
  const GET_BUSINESS_DOCUMENTS_QUERY = `
    query GetBusinessDocuments {
      businessDocuments {
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
    options
  );
  return {
    userBusinesses: userBusinessesQuery,
    registerBusiness: registerBusinessMutation,
    businessDetail: businessDetailMutation,
    uploadDocument: uploadDocumentMutation,
    deleteDocument: deleteDocumentMutation,
    kybDocuments: kybDocumentsQuery,
    businessDocuments: businessDocumentsQuery
  };
};

export { useBusiness as u };
//# sourceMappingURL=useBusiness-DUTOJ7No.mjs.map
