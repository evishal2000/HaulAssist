package helper

import "haulassist_backend/internal/model"

// CargoType multipliers
const (
	SmallMultiplier  = 1.0
	MediumMultiplier = 1.4
	BigMultiplier    = 1.8
)

// Time surge factors
const (
	RegularTime = 1.0
	PeakTime    = 1.3
)

// Rate constants
const (
	BaseCost     = 20.0
	DistanceRate = 1.2 // per mile
)

func CalculateCost(c *model.Cargo) float64 {

	// Determine type multiplier
	var typeMultiplier float64
	switch c.VehicleType {
	case "small":
		typeMultiplier = SmallMultiplier
	case "medium":
		typeMultiplier = MediumMultiplier
	case "large":
		typeMultiplier = BigMultiplier
	default:
		typeMultiplier = 1.0 // Default to small if unknown
	}

	// Determine time surge multiplier
	timeSurge := RegularTime

	//after adding pickup time in cargo, handle peak hours, assign peak time to timeSurge if its the case

	// Compute cost //after adding pickup and drop locations, handle distance (c.Distance * DistanceRate)
	cost := BaseCost + (10 * DistanceRate) //10 miles
	cost *= typeMultiplier * timeSurge

	return cost
}
