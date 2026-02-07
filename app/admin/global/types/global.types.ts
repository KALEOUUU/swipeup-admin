export interface GlobalSetting {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  key: string;
  value: string;
  is_active: boolean;
}

export interface UpdateGlobalSettingRequest {
  value: string;
}