class UploadDocument {
  constructor(id_verifyDocument, document, typeDocument, id_state ) {
    this.id_verifyDocument = id_verifyDocument;
    this.document = document;
    this.typeDocument = typeDocument;
    this.id_state = id_state;
  }
}

module.exports = UploadDocument;
