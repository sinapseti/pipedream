import app from "../../content_snare.app.mjs";

export default {
  key: "content_snare-create-request",
  name: "Create Request on Content Snare",
  description: "Initiates a novel request on Content Snare. The mandatory prop is name and all other props are optional. [See the documentation](https://api.contentsnare.com/partner_api/v1/documentation#post-/partner_api/v1/requests)",
  version: "0.0.1",
  type: "action",
  props: {
    app,
    name: {
      type: "string",
      label: "Request Name",
      description: "The name of the request to initiate on Content Snare.",
    },
    clientEmail: {
      optional: true,
      propDefinition: [
        app,
        "clientEmail",
      ],
    },
    clientFullName: {
      optional: true,
      propDefinition: [
        app,
        "clientFullName",
      ],
    },
    clientPhone: {
      propDefinition: [
        app,
        "clientPhone",
      ],
    },
    companyName: {
      propDefinition: [
        app,
        "companyName",
      ],
    },
  },
  methods: {
    createRequest(args = {}) {
      return this.app.post({
        path: "/requests",
        ...args,
      });
    },
  },
  async run({ $ }) {
    const {
      createRequest,
      name,
      clientEmail,
      clientFullName,
      clientPhone,
      companyName,
    } = this;

    const response = await createRequest({
      $,
      data: {
        name,
        client_email: clientEmail,
        client_full_name: clientFullName,
        client_phone: clientPhone,
        company_name: companyName,
      },
    });

    $.export("$summary", `Successfully created request with ID \`${response.id}\``);

    return response;
  },
};
