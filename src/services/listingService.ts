// services
import * as tokenService from './tokenService'

// models
import { Listing } from '../types/models'

// types
import { CreateListingFormData } from '../types/forms'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/api/listings`

async function createListing(formData: CreateListingFormData): Promise<Listing> {
  try {
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tokenService.getToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    return await res.json() as Listing
  } catch (error) {
    throw error
  }
}

export { createListing }
