export interface CredentialResponse {
   credential: string;
   select_by:
     | 'auto'
     | 'user'
     | 'user_1tap'
     | 'user_2tap'
     | 'btn'
     | 'btn_confirm'
     | 'btn_add_session'
     | 'btn_confirm_add_session';
 }
 
 export interface PromptMomentNotification {
   isDisplayMoment: () => boolean;
   isDisplayed: () => boolean;
   isNotDisplayed: () => boolean;
   getNotDisplayedReason: () =>
     | 'browser_not_supported'
     | 'invalid_client'
     | 'missing_client_id'
     | 'opt_out_or_no_session'
     | 'secure_http_required'
     | 'suppressed_by_user'
     | 'unregistered_origin'
     | 'unknown_reason';
   isSkippedMoment: () => boolean;
   getSkippedReason: () =>
     | 'auto_cancel'
     | 'user_cancel'
     | 'tap_outside'
     | 'issuing_failed';
   isDismissedMoment: () => boolean;
   getDismissedReason: () =>
     | 'credential_returned'
     | 'cancel_called'
     | 'flow_restarted';
   getMomentType: () => 'display' | 'skipped' | 'dismissed';
 }
