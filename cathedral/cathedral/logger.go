package cathedral

import (
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
	"os"
)

func newDevelopmentLogger() *zap.Logger {
	core := zapcore.NewCore(
		zapcore.NewConsoleEncoder(zap.NewDevelopmentEncoderConfig()),
		os.Stderr,
		zap.DebugLevel,
	)
	return zap.New(core, zap.AddStacktrace(zap.WarnLevel), zap.AddCaller())
}

func newProductionLogger() *zap.Logger {
	core := zapcore.NewCore(
		zapcore.NewConsoleEncoder(zap.NewProductionEncoderConfig()),
		os.Stderr,
		zap.InfoLevel,
	)
	return zap.New(core, zap.AddStacktrace(zap.ErrorLevel))
}
