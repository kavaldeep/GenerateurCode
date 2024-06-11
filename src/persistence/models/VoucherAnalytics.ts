export interface VoucherAnalytics {
    voucher_id: string;
    total_vouchers: number,
    total_voucher_codes: number,
    total_active_vouchers: number,
    total_campaign_vouchers?: number,
    total_category_vouchers?: number,
    total_type_vouchers?: number
}
