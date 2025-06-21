import { describe, it, expect } from 'vitest'
import { pathBuilder } from '../pathBuilder'

describe('pathBuilder', () => {
    describe('Basic path building', () => {
        it('should return basic path without parameters', () => {
            const result = pathBuilder('HOME')
            
            expect(result).toBe('/')
        })

        it('should return builder path without parameters', () => {
            const result = pathBuilder('BUILDER')
            
            expect(result).toBe('/builder')
        })
    })

    describe('Path building with parameters', () => {
        it('should build path with single parameter', () => {
            const result = pathBuilder('BUILDER', { id: 123 })
            
            expect(result).toBe('/builder?id=123')
        })

        it('should handle undefined parameters by returning base path', () => {
            const result = pathBuilder('HOME', undefined)
            
            expect(result).toBe('/')
        })

        it('should handle empty parameters object by returning base path', () => {
            const result = pathBuilder('BUILDER', {})
            
            expect(result).toBe('/builder')
        })
    })

    describe('Parameter value handling', () => {
        it('should convert number parameters to strings', () => {
            const result = pathBuilder('BUILDER', { id: 456 })
            
            expect(result).toBe('/builder?id=456')
        })
    })
})
