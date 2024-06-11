
export interface CampaignAnalyticsNew {
    campaign_id: string;
    total_number_voucher_code: number;
    total_redeem_voucher: number;
    total_number_customers: number;
    total_redemption_date_count: Record<string, number>;
    total_redemption_date_point: Record<string, number>;
    total_redeems_point: number;
}