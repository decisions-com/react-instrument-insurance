import React from "react";

interface IDiscountDetailProps {
  iconUrl: string;
  label: string;
  value: string;
}

export default function DiscountDetail({
  label,
  value,
  iconUrl,
}: IDiscountDetailProps) {
  return value ? (
    <li className="discount-detail-row">
      <img className="discount-icon" alt={label} src={iconUrl} />
      {label} {value}
    </li>
  ) : null;
}
