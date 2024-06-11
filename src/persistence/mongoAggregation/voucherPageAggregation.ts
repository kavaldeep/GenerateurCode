type AggregationStage = {
  $lookup?: any,
  $unwind?: any,
  $project?: any,
  $sort?: any,
  $skip?: number,
  $limit?: number,
  // Add more stages as required
};

export const voucherCampaignAggregation = (limit : number , page : number) : AggregationStage[]=> { 

return [
{
    '$lookup': {
        'from': 'campaigns', 
        'let': {
            'campaignId': '$campaignId'
        }, 
        'pipeline': [
            {
                '$addFields': {
                    'campaign_id_str': {
                        '$toString': '$_id'
                    }
                }
            }, {
                '$match': {
            '$expr': {
              '$eq': [
                '$campaign_id_str', '$$campaignId'
              ]
            }
          }
        }
      ], 
      'as': 'campaign'
    }
  }, {
    '$unwind': {
      'path': '$campaign'
    }
  }, {
    '$project': {
      "code" : "$code",
      "start_date" : "$start_date",
      "redemption" : "$redemption" , 
      "category" : "$category",
      "active" : "$active",
      "name" : "$campaign.name"
    }
  },
  {
    '$sort': {
        "_id" : -1
    }
  },
  {
    '$skip':  limit * (page - 1)
  }, {
    '$limit': 10
  }
]
}