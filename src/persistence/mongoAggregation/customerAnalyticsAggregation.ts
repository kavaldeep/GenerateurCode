import {
    countQuery,
    fieldQuery,
    groupQuery,
    matchQuery,
    operatorQuery,
    PipelineStagePayloadBuilder
} from "./PipelineStagePayloadBuilder";

/**
 * Method to create the payload, best practice is to create the payload beforehand, for example in MongoDBCompass,
 * so the payload can be copied 1:1 from there into the code.
 *
 * @param customer_Id - customer id for the analytics
 */
export const getCustomerAnalyticsPayload = (customer_Id: string) => {

    const dateToStringQuery: any = {"format": "%Y-%m-%d", "date": "$redemption.date"};

    let pipelineStagePayload = new PipelineStagePayloadBuilder();

    pipelineStagePayload.addToFacet("total_count_redeems_by_customers", [
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        matchQuery(fieldQuery("redemption.customer_id", customer_Id)),
        countQuery("total_count_redeems_by_customers")
    ]);

    pipelineStagePayload.addToFacet("total_redeems_amount_by_customers", [
        matchQuery(fieldQuery("redemption", operatorQuery("gte", fieldQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        matchQuery(fieldQuery("redemption.customer_id", customer_Id)),
        groupQuery(fieldQuery("day", operatorQuery("dateToString", dateToStringQuery)),
            [fieldQuery("count", operatorQuery("sum", "$amount"))])
    ]);

    pipelineStagePayload.addToFacet("total_type_voucher_bought_by_customers", [
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        matchQuery(fieldQuery("redemption.customer_id", customer_Id)),
        groupQuery("$type", [fieldQuery("count", operatorQuery("sum", 1))])
    ]);

    pipelineStagePayload.addToFacet("total_redemption_date_count_by_customers", [
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        groupQuery(fieldQuery("day", operatorQuery("dateToString", dateToStringQuery)),
            [fieldQuery("count", operatorQuery("sum", 1))])
    ]);

    pipelineStagePayload.addToFacet("total_redemption_date_amount_by_customers", [
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        groupQuery(fieldQuery("day", operatorQuery("dateToString", dateToStringQuery)),
            [fieldQuery("count", operatorQuery("sum", "$amount"))])
    ]);

    return pipelineStagePayload.payload;
}