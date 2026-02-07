export interface StandCanteen {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  stand_id: number;
  stand: {
    id: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    student_id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    class: string;
    balance: number;
    is_active: boolean;
    rfid_card: string;
  };
  store_name: string;
  qris: string;
  is_active: boolean;
}

export interface CreateStandCanteenRequest {
  stand_id: number;
  store_name: string;
  qris: string;
  is_active: boolean;
}

export interface UpdateStandCanteenRequest {
  store_name: string;
  qris: string;
  is_active: boolean;
}