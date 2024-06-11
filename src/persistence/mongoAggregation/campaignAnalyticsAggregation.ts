import {
    countQuery,
    fieldQuery,
    groupQuery,
    matchQuery,
    operatorQuery,
    PipelineStagePayloadBuilder
} from "./PipelineStagePayloadBuilder";

/**
 * Method to create the payload. Best practice is to create the payload beforehand, for example in MongoDBCompass,
 * so the payload can be copied 1:1 from there into the code.
 *
 * @param campaign_id - campaign id for the analytics
 * @param begin_date - begin date of data analytics
 * @param end_date - end date of data analytics
 */
export const getCampaignAnalyticsPayload = (campaign_id: string, begin_date: Date, end_date: Date) => {

    const dateToStringQuery: any = {"format": "%Y-%m-%d", "date": "$redemption.date"};

    let pipelineStage = new PipelineStagePayloadBuilder();

    pipelineStage.addToFacet("total_number_voucher_code", [
        matchQuery(fieldQuery("campaignId", campaign_id)), countQuery("total_number_voucher_code")
    ]);

    pipelineStage.addToFacet("total_redeem_voucher", [
        matchQuery(fieldQuery("campaignId", campaign_id)),
        matchQuery(fieldQuery("redemption",
            operatorQuery("gte", operatorQuery("size", 1)))),
        countQuery("total_redeem_voucher")
    ]);

    pipelineStage.addToFacet("total_number_customers", [
        matchQuery(fieldQuery("campaignId", campaign_id)),
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        groupQuery("$redemption.customer_id",
            [fieldQuery("count", operatorQuery("sum", 1))]),
        countQuery("total_number_customers")
    ]);


    pipelineStage.addToFacet("total_redemption_date_count", [
        matchQuery(fieldQuery("campaignId", campaign_id)),
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1))),),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        matchQuery(operatorQuery("and", [
            fieldQuery("redemption.date", operatorQuery("gte", begin_date)),
            fieldQuery("redemption.date", operatorQuery("lt", end_date))
        ])),
        groupQuery(fieldQuery("day", operatorQuery("dateToString", dateToStringQuery)),
            [fieldQuery("count", operatorQuery("sum", 1))])
    ]);

    pipelineStage.addToFacet("total_redemption_date_point", [
        matchQuery(fieldQuery("campaignId", campaign_id)),
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        operatorQuery("unwind", fieldQuery("path", "$redemption")),
        matchQuery(operatorQuery("and", [
            fieldQuery("redemption.date", operatorQuery("gte", begin_date)),
            fieldQuery("redemption.date", operatorQuery("lt", end_date))
        ])),
        groupQuery(fieldQuery("day", operatorQuery("dateToString", dateToStringQuery)),
            [fieldQuery("count", operatorQuery("sum", 1))])
    ]);

    pipelineStage.addToFacet("total_redeems_point", [
        matchQuery(fieldQuery("campaignId", campaign_id)),
        matchQuery(fieldQuery("redemption", operatorQuery("gte", operatorQuery("size", 1)))),
        groupQuery("total_redeems_point",
            [fieldQuery("count", operatorQuery("sum", "$amount"))])
    ]);

    return pipelineStage.payload;
}
