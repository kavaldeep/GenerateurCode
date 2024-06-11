
export class PipelineStagePayloadBuilder {
    /**
     * Builds and returns a payload for MongoDB aggregation.
     *
     * @private payload - The payload for a mongoDB aggregation
     */
    private readonly _payload: any;

    /**
     * Constructor to create the base payload with a facet stage.
     *
     * {@link https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/ | MongoDB $facet doc}
     */
    constructor() {
        this._payload = [{"$facet": {}}];
    }

    /**
     * Returns the payload.
     */
    get payload() {
        return this._payload;
    }

    /**
     * Adding aggregation to the facet stage of the payload
     *
     * {@link https://www.mongodb.com/docs/manual/reference/operator/aggregation/facet/ | MongoDB $facet doc}
     *
     * @param aggregationName - Name of the aggregation
     * @param aggregation - one or multiple aggregations
     */
    public addToFacet(aggregationName: string, aggregation: Array<any>) {
        this._payload[0].$facet[aggregationName] = aggregation;
    }
}

/**
 * Returns an aggregation with an operator.
 *
 * {@link https://www.mongodb.com/docs/manual/reference/operator/ | MongoDB operators doc}
 *
 * @param operator - operator used for the aggregation
 * @param expression - expression for the operator
 */
export const operatorQuery = (operator: string, expression: any) => {
    return {["$" + operator]: expression};
}

/**
 * Returns a match aggregation
 *
 * {@link https://www.mongodb.com/docs/manual/reference/operator/aggregation/match/ | MongoDB $match doc}
 *
 * @param query - query to match
 */
export const matchQuery = (query: any) => {
    return {"$match": query };
}

/**
 * Returns a field aggregation
 *
 * @param fieldName - name of the field to check
 * @param compareValue - value to compare
 */
export const fieldQuery = (fieldName: string, compareValue: any) => {
    return { [fieldName]: compareValue };
}

/**
 * Returns a group aggregation
 *
 * {@link https://www.mongodb.com/docs/manual/reference/operator/aggregation/group/ | MongoDB $group doc}
 *
 * @param groupKey - a field or group of fields
 * @param fields - additional fields for the output
 *
 */
export const groupQuery = (groupKey: any, fields?: Array<{[key: string]: any}>) => {
    let groupJSON: {[index: string]: any} = {"$group": {"_id": groupKey}};
    if (fields) fields.forEach(value => Object.assign(groupJSON["$group"], value));
  return groupJSON;
}

/**
 * Returns a count aggregation
 *
 * {@link https://www.mongodb.com/docs/manual/reference/operator/aggregation/count/ | MongoDB $count doc}
 *
 * @param countLabel - Label for the result
 */
export const countQuery = (countLabel: string) => {
  return {"$count": countLabel};
}
