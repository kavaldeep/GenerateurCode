
export interface CustomerAnalytics {
    customer_id: string;
    total_count_redeems_by_customers: number;
    total_redeems_amount_by_customers: Record<string, number>;
    total_type_voucher_bought_by_customers: Record<string, number>;
    total_redemption_date_count_by_customers: Record<string, number>;
    total_redemption_date_amount_by_customers: Record<string, number>;
}