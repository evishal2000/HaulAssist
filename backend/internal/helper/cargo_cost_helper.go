package helper

import "haulassist_backend/internal/model"

// CargoType multipliers
const (
	SmallMultiplier  = 1.0
	MediumMultiplier = 1.2
	BigMultiplier    = 1.5
)

// Time surge factors
const (
	RegularTime = 1.0
	PeakTime    = 1.3
)

// Rate constants
const (
	BaseCost      = 5.0
	WeightRate    = 0.5 // per pound
	DimensionRate = 0.2 // per cubic meter
	DistanceRate  = 1.5 // per mile
)

func CalculateCost(c *model.Cargo) float64 {
	// Calculate volume
	volume := c.Length * c.Width * c.Height

	// Determine type multiplier
	var typeMultiplier float64
	switch c.Type {
	case "small":
		typeMultiplier = SmallMultiplier
	case "medium":
		typeMultiplier = MediumMultiplier
	case "big":
		typeMultiplier = BigMultiplier
	default:
		typeMultiplier = 1.0 // Default to small if unknown
	}

	// Determine time surge multiplier
	timeSurge := RegularTime

	//after adding pickup time in cargo, handle peak hours, assign peak time to timeSurge if its the case

	// Compute cost //after adding pickup and drop locations, handle distance (c.Distance * DistanceRate)
	cost := BaseCost + (float64(c.Weight) * WeightRate) + (float64(volume) * DimensionRate) + (10 * DistanceRate) //10 km
	cost *= typeMultiplier * timeSurge

	return cost
}
