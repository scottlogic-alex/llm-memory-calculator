import { AdamDataType, type AdamConfig } from './adam-config';

// https://arxiv.org/abs/1412.6980
// https://github.com/pytorch/pytorch/blob/main/torch/optim/adam.py
export interface AdamBytesPerParam {
    // estimate of 1st moment of gradient
    grad_mean_estimate: number;
    // estimate of 2nd raw moment of gradient
    grad_var_estimate: number;
}

export const getAdamBytesPerParam = ({ dtype }: AdamConfig): AdamBytesPerParam => {
    switch(dtype) {
        case AdamDataType.float32:
            return {
                grad_mean_estimate: 4,
                grad_var_estimate: 4
            };
        case AdamDataType.int8:
            return {
                grad_mean_estimate: 1,
                grad_var_estimate: 1
            };
        default:
            throw new Error(`Unimplemented AdamDataType: ${dtype satisfies never}`);
    }
}