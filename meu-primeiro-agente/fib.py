def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        yield a
        a, b = b, a + b

if __name__ == "__main__":
    n = 10
    print(f"Primeiros {n} números de Fibonacci:")
    print(list(fibonacci(n)))
