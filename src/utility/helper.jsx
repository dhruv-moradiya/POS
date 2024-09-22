function getCapitalizedWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export { getCapitalizedWord };

import {
  CheckCircle,
  Hourglass,
  XCircle,
  PauseCircle,
  DollarSign,
  AlertCircle,
  Check,
  MapPin,
  UserCheck,
  MapPinCheck,
} from "lucide-react";

export function getStatusIcon(status) {
  switch (status) {
    case "PLACED":
      return <CheckCircle size={14} color="blue" />;
    case "PENDING":
      return <Hourglass size={14} color="orange" />;
    case "COMPLETED":
      return <Check size={14} color="green" />;
    case "CANCELED":
      return <XCircle size={14} color="red" />;
    case "HOLD":
      return <PauseCircle size={14} color="purple" />;
    case "PAID":
      return <DollarSign size={14} color="green" />;
    case "UNPAID":
      return <AlertCircle size={14} color="red" />;
    case "ARRIVED":
      return <MapPinCheck size={14} color="teal" />;
    default:
      return null;
  }
}
