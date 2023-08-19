import { TonalityOutlined } from "@mui/icons-material";
import { DetailedHTMLProps, SelectHTMLAttributes } from "react";

export type SelectProps = DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> & {
    icon?: typeof TonalityOutlined;
};
