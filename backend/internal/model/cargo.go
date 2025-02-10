package model

type Cargo struct {
	CargoID       int64  `json:"id"`
	Name          string `json:"name"`
	Type          string `json:"type"`
	Weight        int    `json:"weight"`
	Length        int    `json:"length"`
	Width         int    `json:"width"`
	Height        int    `json:"height"`
	CostPerWeight int    `json:"cost_per_weight"`
}
