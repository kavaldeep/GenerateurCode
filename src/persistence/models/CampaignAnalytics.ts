
export interface CampaignAnalytics {
 
    campaign_id: string;
    total_vouchers: number;
    total_points : number;
    total_redemptions_amount: number;
    total_reedem_voucher : number 
    total_redemptions_count_by_date: Record<string, number>;
    total_redmeed_points_by_date: Record<string, number>;
    total_customers: number;
    
}